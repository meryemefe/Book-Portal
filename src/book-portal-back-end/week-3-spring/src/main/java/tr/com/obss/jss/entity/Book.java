package tr.com.obss.jss.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

/**
 * This is Book Entity class.
 * It includes name, unique ISBN, publisher, publication year, language, and category columns
 * as well as a join table which is used to define books' authors.
 * Additionally, it includes two more join tables which are users' read list and favorite list.
 */
@Entity
@Table(name = "BOOK")
public class Book extends EntityBase {

    //* COLUMNS *//

    @Column(name = "NAME")
    private String name;

    @Column(name = "ISBN", unique = true)
    private String isbn;

    @Column(name = "PUBLISHER")
    private String publisher;

    @Column(name = "PUBLICATION_YEAR")
    private int publicationYear;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "LANGUAGE")
    private String language;

    //* JOIN TABLES *//

    // BOOKS_AUTHORS Join Table
    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(name = "BOOKS_AUTHORS",
            joinColumns = {@JoinColumn(name = "BOOK_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID")})
    @JsonManagedReference
    private List<Author> authors;

    // FAVORITE_LIST Join Table
    @OneToMany(mappedBy = "likedBook", fetch = FetchType.LAZY)
    @ElementCollection(targetClass = FavoriteList.class)
    private List<FavoriteList> likedByUserList;

    // READ_LIST Join Table
    @OneToMany(mappedBy = "readBook", fetch = FetchType.LAZY)
    @ElementCollection(targetClass = ReadList.class)
    private List<ReadList> readByUserList;


    //* GETTER & SETTER METHODS *//
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    public List<FavoriteList> getLikedByUserList() {
        return likedByUserList;
    }

    public void setLikedByUserList(List<FavoriteList> likedByUserList) {
        this.likedByUserList = likedByUserList;
    }

    public List<ReadList> getReadByUserList() {
        return readByUserList;
    }

    public void setReadByUserList(List<ReadList> readByUserList) {
        this.readByUserList = readByUserList;
    }
}