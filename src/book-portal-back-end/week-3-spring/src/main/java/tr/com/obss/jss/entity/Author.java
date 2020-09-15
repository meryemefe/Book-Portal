package tr.com.obss.jss.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

/**
 * This is Author Entity class.
 * It includes name, surname, birth year, and death year columns
 * as well as a join table which is used to define authors' books.
 */
@Entity
@Table(name = "AUTHOR")
public class Author extends EntityBase {

    //* COLUMNS *//

    @Column(name = "NAME")
    private String name;

    @Column(name = "SURNAME")
    private String surname;

    @Column(name = "BIRTH_YEAR")
    private int birthYear;

    @Column(name = "DEATH_YEAR")
    private int deathYear;

    // BOOKS_AUTHORS Join Table
    @ManyToMany(mappedBy = "authors")
    @JsonBackReference
    private List<Book> books;

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

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
}