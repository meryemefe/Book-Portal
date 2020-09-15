package tr.com.obss.jss.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * This is DTO class of Author object.
 * It forces user to enter a valid name and surname.
 * Also, user can enter birth and death years.
 */
public class AuthorDTO {

    @NotBlank(message = "Please, enter a name!")
    @Size(max = 255)
    private String name;

    @NotBlank(message = "Please, enter a surname!")
    @Size(max = 255)
    private String surname;

    private int birthYear;

    private int deathYear;

    //* GETTER & SETTER METHODS *//
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFullName() {
        return getName() + " " + getSurname();
    }

    public int getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }

    public int getDeathYear() {
        return deathYear;
    }

    public void setDeathYear(int deathYear) {
        this.deathYear = deathYear;
    }
}