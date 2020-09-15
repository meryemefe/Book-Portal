package tr.com.obss.jss.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.Book;

import java.util.List;
import java.util.Optional;

/**
 * This is Book Repository interface
 * which includes some queries to be used by Service classes.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findById( long id);
    List<Book> findByName( String name);
    List<Book> findByCategory( String category);
    List<Book> findByLanguage( String language);

    Page<Book> findAllByIdIn( List<Long> id, Pageable pageable);

    Page<Book> findAllByActiveTrue(Pageable pageable);

    Page<Book> findByNameContainsAndActiveTrue(String name, Pageable pageable);

}
