class IdleTimer {
  constructor({ timeout, handleLogout }) {
    this.timeout = timeout;
    this.handleLogout = handleLogout;
  }
  updateExpiredTime = () => {
    localStorage.setItem("expiredTime", Date.now() + this.timeout * 60 * 1000);
  };
  setTracker = () => {
    window.addEventListener("mousemove", this.updateExpiredTime);
    window.addEventListener("scroll", this.updateExpiredTime);
    window.addEventListener("keydown", this.updateExpiredTime);
  };
  logoutTimer = () => {
    this.updateExpiredTime();
    this.internal = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem("expiredTime")) || 0;
      if (Date.now() > expiredTime) {
        console.log("Timeout");
        this.handleLogout();
      }
    }, 1000);
  };
  clearTracker = () => {
    clearInterval(this.internal);
    window.removeEventListener("mousemove", this.updateExpiredTime);
    window.removeEventListener("scroll", this.updateExpiredTime);
    window.removeEventListener("keydown", this.updateExpiredTime);
  };
}

export { IdleTimer };
