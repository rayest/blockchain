// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract BlindAuction {
    struct Bid {
        bytes32 blindedBid;
        uint deposit;
    }

    address payable public beneficiary;
    uint public biddingEnd;
    uint public revealEnd;
    bool public ended;

    mapping(address => Bid[]) public bids;

    address public highestBidder;
    uint public highestBid;

    mapping(address => uint) pendingReturns;

    event AuctionEnded(address winner, uint highestBid);

    error TooEarly(uint time);
    error TooLate(uint time);
    error AuctionEndAlreadyCalled();

    modifier onlyBefore(uint time){
        if (block.timestamp >= time){
            revert TooLate(time);
        }
        _;
    }

    modifier onlyAfter(uint time){
        if(block.timestamp <= time){
            revert TooEarly(time);
        }
        _;
    }

    constructor(uint biddingTime, uint revealTime, address payable beneficiaryAddress){
        beneficiary = beneficiaryAddress;
        biddingEnd = block.timestamp + biddingTime;
        revealEnd = biddingTime + revealTime;
    }

    function doBid(bytes32 blindedBid) external payable onlyBefore(biddingEnd){
        bids[msg.sender].push(Bid({
            blindedBid: blindedBid,
            deposit: msg.value
        }));
    }

    function reveal(uint[] calldata values, bool[] calldata fake, bytes32[] calldata secret) 
        external onlyAfter(biddingEnd) onlyBefore(revealEnd) {
            uint length = bids[msg.sender].length;
            require( values.length == length);
            require(fake.length == length);
            require(secret.length == length);

            uint refund;
            for(uint i = 0; i < length; i++){
                Bid storage bid = bids[msg.sender][i];
                (uint value, bool fake, bytes32 secret) = (values[i], fake[i], secret[i]);

                if(bid.blindedBid != keccak256(value, fake, secret)){
                    continue;
                }

                refund += bid.deposit;
                if(!fake && bid.deposit > value){
                    if (placeBid(msg.sender, value)){
                        refund -= value;
                    }
                }
                bid.blindedBid = bytes32(0);
            }

            msg.sender.transfer(refund);
    }

    function placeBid(address bidder, uint value) internal returns(bool success){
        if (value <= highestBid){
            return false;
        }

        if (highestBidder != address){
            pendingReturns[highestBidder] += highestBid;
        }

        highestBid = value;
        highestBidder = bidder;
        return true;
    }

    function withdraw() external{
        uint amount = pendingReturns[msg.sender];
        if(amount > 0){
            pendingReturns[msg.sender] = 0;
            msg.sender.transfer(amount);
        }
    }

    function auctionEnd() external onlyAfter(revealEnd){
        if (ended){
            revert AuctionEndAlreadyCalled();
        }
        emit AuctionEnded(highestBidder, highestBid);
        ended = true;
        beneficiary.transfer(highestBid);
    }
}