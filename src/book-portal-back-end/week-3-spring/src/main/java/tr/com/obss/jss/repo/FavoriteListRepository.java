package tr.com.obss.jss.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.Book;
import tr.com.obss.jss.entity.FavoriteList;
import tr.com.obss.jss.entity.User;

import java.util.List;
import java.util.Optional;

/**
 * This is Favorite List Repository interface
 * which includes some queries to be used by Service classes.
 */
@Repository
public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {

    List<FavoriteList> findByLikedByUserId(Long userId);

    Page<FavoriteList> findAllByLikedByUser(User user, Pageable pageable);

    @Query("select t.likedBook, t.likedDate from FavoriteList t where t.likedByUser = :user")
    List<Object> findByUser(User user);

    @Query("select t.likedBook from FavoriteList t where t.likedByUser = :user")
    List<Book> findBookByUser(User user);

    @Override
    void delete(FavoriteList favoriteList);

    @Query("select t from FavoriteList t where t.likedByUser = :user and t.likedBook = :book")
    Optional<FavoriteList> findByUserAndBook(User user, Book book);
}
