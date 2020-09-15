package tr.com.obss.jss.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * This is FAVORITE LIST class to holds users' favorite books.
 * This join table includes a unique id, user's id, book's id, and the date when user liked book.
 * Differently, this entity class doesn't extend super EntityBase class,
 * this is because it will be removed hardly if users remove a book from their favorite lists.
 * Therefore, it is not necessary to hold properties such as operation type, update date.
 */
@Entity
@Table(name = "FAVORITE_LIST")
public class FavoriteList {

    //* COLUMNS *//

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIKE_LIST_ID")
    private long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "USER_ID")
    @ElementCollection(targetClass = User.class)
    @JsonIgnore
    private User likedByUser;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "BOOK_ID")
    @ElementCollection(targetClass = Book.class)
    @JsonIgnore
    private Book likedBook;

    @Column(name = "LIKED_DATE")
    @Temporal(TemporalType.DATE)
    private Date likedDate;

    //* GETTER & SETTER METHODS *//
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getLikedByUser() {
        return likedByUser;
    }

    public void setLikedByUser(User likedByUser) {
        this.likedByUser = likedByUser;
    }

    public Book getLikedBook() {
        return likedBook;
    }

    public void setLikedBook(Book likedBook) {
        this.likedBook = likedBook;
    }

    public Date getLikedDate() {
        return likedDate;
    }

    public void setLikedDate(Date likedDate) {
        this.likedDate = likedDate;
    }
}