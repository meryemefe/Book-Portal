package tr.com.obss.jss.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.Book;
import tr.com.obss.jss.entity.ReadList;
import tr.com.obss.jss.entity.User;

import java.util.List;
import java.util.Optional;

/**
 * This is Read List Repository interface
 * which includes some queries to be used by Service classes.
 */
@Repository
public interface ReadListRepository extends JpaRepository<ReadList, Long> {

    @Query("select t from ReadList t where t.readByUser = :user and t.readBook = :book")
    Optional<ReadList> findByUserAndBook(User user, Book book);

    @Query("select t.readBook from ReadList t where t.readByUser = :user")
    List<Book> findBookByUser(User user);

    @Query("select t.readBook, t.readDate from ReadList t where t.readByUser = :user")
    List<Object> findByUser(User user);
}
