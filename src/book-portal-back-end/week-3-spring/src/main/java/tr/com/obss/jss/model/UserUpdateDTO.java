package tr.com.obss.jss.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * This class includes only password property of user.
 * It is used to change password.
 */
public class UserUpdateDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please, enter a valid password!")
    private String password;

    //* GETTER & SETTER METHODS *//
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
