//говорят говнокод
function stringToUint(string s) constant returns (uint) {
    bytes memory b = bytes(s);
    uint result = 0;
    for (uint i = 0; i < b.length; i++) { // c = b[i] was not needed
        if (b[i] >= 48 && b[i] <= 57) {
            result = result * 10 + (uint(b[i]) - 48); // bytes and int are not compatible with the operator -.
        }
    }
    return result; // this was missing
}

function uintToString(uint v) constant returns (string) {
    uint maxlength = 100;
    bytes memory reversed = new bytes(maxlength);
    uint i = 0;
    while (v != 0) {
        uint remainder = v % 10;
        v = v / 10;
        reversed[i++] = byte(48 + remainder);
    }
    bytes memory s = new bytes(i); // i + 1 is inefficient
    for (uint j = 0; j < i; j++) {
        s[j] = reversed[i - j - 1]; // to avoid the off-by-one error
    }
    string memory str = string(s);  // memory isn't implicitly convertible to storage
    return str // this was missing
}





function parseInt(string _a, uint _b) internal returns (uint) {
  bytes memory bresult = bytes(_a);
  uint mint = 0;
  bool decimals = false;
  for (uint i = 0; i < bresult.length; i++) {
    if ((bresult[i] >= 48) && (bresult[i] <= 57)) {
      if (decimals) {
        if (_b == 0) break;
          else _b--;
      }
      mint *= 10;
      mint += uint(bresult[i]) - 48;
    } else if (bresult[i] == 46) decimals = true;
  }
  return mint;
}

