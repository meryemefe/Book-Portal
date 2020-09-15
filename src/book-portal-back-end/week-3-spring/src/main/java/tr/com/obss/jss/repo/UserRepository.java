package tr.com.obss.jss.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.User;

import java.util.List;
import java.util.Optional;

/**
 * This is User Repository interface
 * which includes some queries to be used by Service classes.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Page<User> findByUsernameContains(String username, Pageable pageable);

    List<User> findByRoles_NameIn(List<String> roles);
    
    @Query("select u from User u where u.id = :id")
    Optional<User> getById(long id);

    @Query(value = "select * from User u where u.id = :id", nativeQuery = true)
    Optional<User> getByNative(long id);
}
