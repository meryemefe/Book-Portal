package tr.com.obss.jss.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * This is DTO class of User object.
 * It forces user to enter a valid email as username and password.
 */
public class UserDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please, enter a valid username!")
    @Email
    private String username;

    @NotBlank
    @Size(max = 255, min = 3, message = "Please, enter a valid password!")
    private String password;

    //* GETTER & SETTER METHODS *//
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
