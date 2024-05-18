// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Purchase{
    uint public value;
    address payable public seller;
    address payable public buyer;

    enum State {Created, Locked, Released, Inactive}

    State public state;

    modifier condition(bool condition_){
        require(condition_);
        _;
    }

    error OnlyBuyer();
    error OnlySeller();
    error InvalidState();
    error ValueNotEven();

    modifier onlyBuyer(){
        require(msg.sender == buyer, "Only buyer can call this");
        _;
    }

    modifier onlySeller(){
        require(msg.sender == seller, "Only seller can call this");
        _;
    }

    modifier inState(State state_){
        require(state_ == state, "Invalid state");
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();
    event SellerRefunded();

    constructor() payable{
        seller = payable(msg.sender);
        value = msg.value / 2;
        if ((value * 2) != msg.value){
            revert ValueNotEven();
        }
    }

    function abort() 
        external 
        onlySeller 
        inState(State.Created)
    {
        emit Aborted();
        state = State.Inactive;
        seller.transfer(address(this).balance);
    }

    function confirmPurchase() 
        external 
        inState(State.Created) 
        condition(msg.value == 2 * value)
        payable
    {
        emit PurchaseConfirmed();
        buyer = payable(msg.sender);
        state = State.Locked;
    }

    function confirmReceived() 
        external 
        onlyBuyer
        inState(State.Locked)
    {
        emit ItemReceived();
        state = State.Released;
        buyer.transfer(value);
    }

    function refundSeller() 
        external
        onlySeller
        inState(State.Released)
    {
        emit SellerRefunded();
        state = State.Inactive;
        seller.transfer(3 * value);
    }    
}