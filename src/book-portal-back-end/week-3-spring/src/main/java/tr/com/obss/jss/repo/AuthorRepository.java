package tr.com.obss.jss.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.Author;

import java.util.List;
import java.util.Optional;

/**
 * This is Author Repository interface
 * which includes some queries to be used by Service classes.
 */
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    
    Page<Author> findByNameContainsAndActiveTrue(String fullname, Pageable pageable);

    Page<Author> findAllByActiveTrue(Pageable pageable);

    List<Author> findByName(String name);

    List<Author> findBySurname(String surname);

    @Query("select t from Author t where t.name = :name and t.surname = :surname and t.birthYear = :birthYear and t.deathYear = :deathYear")
    Optional<Author> findByAuthorDTOInfo(String name, String surname, int birthYear, int deathYear);

}
