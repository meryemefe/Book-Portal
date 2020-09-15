package tr.com.obss.jss.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * This is READ LIST class to holds users' read books.
 * This join table includes a unique id, user's id, book's id, and the date when user added this book to read list.
 * Differently, this entity class doesn't extend super EntityBase class,
 * this is because it will be removed hardly if users remove a book from their read lists.
 * Therefore, it is not necessary to hold properties such as operation type, update date.
 */
@Entity
@Table(name = "READ_LIST")
public class ReadList {

    //* COLUMNS *//

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "READ_LIST_ID")
    private long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "USER_ID")
    @ElementCollection(targetClass = User.class)
    @JsonIgnore
    private User readByUser;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "BOOK_ID")
    @ElementCollection(targetClass = Book.class)
    @JsonIgnore
    private Book readBook;

    @Column(name = "READ_DATE")
    @Temporal(TemporalType.DATE)
    private Date readDate;

    //* GETTER & SETTER METHODS *//
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getReadByUser() {
        return readByUser;
    }

    public void setReadByUser(User readByUser) {
        this.readByUser = readByUser;
    }

    public Book getReadBook() {
        return readBook;
    }

    public void setReadBook(Book readBook) {
        this.readBook = readBook;
    }

    public Date getReadDate() {
        return readDate;
    }

    public void setReadDate(Date readDate) {
        this.readDate = readDate;
    }
}
