function Validation() {
  this.checkNull = function (value, errorId, mess) {
    if (value === "") {
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    }

    getEle(errorId).innerHTML = "";
    getEle(errorId).style.display = "none";
    return true;
  };
}
