import { toast } from "react-toastify";

class AuthService {
  getCurrentUserId() {
    return JSON.parse(localStorage.getItem("userId"));
  }

  logout = () => {
    localStorage.clear();

    fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("Error occured!"));
        }
      })
      .then((response) => {
        window.location.href = "/";
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  getCurrentUser = () => {
    fetch("http://localhost:8080/api/users/" + this.getCurrentUserId(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("Exception occured!"));
        }
      })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        //toast.error(e.message);
      });
  };
}

export default new AuthService();
