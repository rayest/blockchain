// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;

    uint256 public candidatesCount;

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint256 _candidateId) public {
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate id"
        );
        candidates[_candidateId].voteCount++;
    }
}
