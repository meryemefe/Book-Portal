package tr.com.obss.jss.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.entity.*;
import tr.com.obss.jss.model.MyUserDetails;
import tr.com.obss.jss.model.UserDTO;
import tr.com.obss.jss.model.UserUpdateDTO;
import tr.com.obss.jss.repo.*;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    // Final variables
    private static final String USER_NOT_FOUND = "User is not found!";
    private static final String BOOK_NOT_FOUND = "Book is not found!";

    // Properties
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private BookRepository bookRepository;
    private FavoriteListRepository favoriteListRepository;
    private ReadListRepository readListRepository;

    // Constructor
    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                       BookRepository bookRepository, FavoriteListRepository favoriteListRepository,
                       ReadListRepository readListRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bookRepository = bookRepository;
        this.favoriteListRepository = favoriteListRepository;
        this.readListRepository = readListRepository;
    }

    @Autowired
    private PasswordEncoder encoder;

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }


    /**
     * This method saves a new user.
     * @param userDTO
     * @return saved user
     */
    public User save(UserDTO userDTO){
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));

        return userRepository.save(user);
    }

    /**
     * This method updates the user's password.
     * @param id
     * @param dto
     * @return updated user
     */
    public User update(long id, UserUpdateDTO dto){
        Optional<User> byId = userRepository.findById(id);
        if( byId.isPresent()){
            User user = byId.get();
            user.setPassword(encoder.encode(dto.getPassword()));
            return userRepository.save(user);
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }

    /**
     * This method deactivates the given user.
     * @param id
     * @return deleted user
     */
    public User delete(long id){
        Optional<User> byId = userRepository.findById(id);
        if( byId.isPresent()){
            User user = byId.get();
            user.setActive(!user.isActive());
            return userRepository.save(user);
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }

    /**
     * This method lists all the users by searching.
     * @param pageSize
     * @param pageNumber
     * @return page of users
     */
    public Page<User> findAll(int pageSize, int pageNumber, String username){
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        if(username.equals("")){
            return userRepository.findAll(paged);
        } else {
            return userRepository.findByUsernameContains(username, paged);
        }
    }

    /**
     * This method finds the user by given id number if exists.
     * @param id
     * @return optional user
     */
    public Optional<User> findById(long id){
        return userRepository.findById(id);
    }

    /**
     * This method finds the user by given username number if exists.
     * @param username
     * @return
     */
    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    /**
     * This method lists the users which have given roles.
     * @param roles
     * @return list of users
     */
    public List<User> findByRoles(List<String> roles){
        return userRepository.findByRoles_NameIn(roles);
    }


    /**
     * This method adds the given book id to the given user's favorite list if list doesn't contain the book.
     * Otherwise, it removes the book from the given list.
     * @param userId
     * @param bookId
     * @return favorite list
     */
    public FavoriteList addOrDeleteLikedBook(long userId, long bookId) {
        Optional<User> user = userRepository.getById(userId);
        Optional<Book> book = bookRepository.findById(bookId);

        if(user.isPresent()){
            if(book.isPresent()){
                Optional<FavoriteList> likeListEntity = favoriteListRepository.findByUserAndBook(user.get(), book.get());

                if( !likeListEntity.isPresent()){
                    FavoriteList savedEntity = new FavoriteList();
                    savedEntity.setLikedByUser(user.get());
                    savedEntity.setLikedBook(book.get());
                    savedEntity.setLikedDate(new Date());

                    return favoriteListRepository.save(savedEntity);
                } else {
                    favoriteListRepository.delete(likeListEntity.get());
                    return likeListEntity.get();
                }
            }
            throw new IllegalArgumentException(BOOK_NOT_FOUND);
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }


    /**
     * This method adds the given book id to the given user's read list if list doesn't contain the book.
     * Otherwise, it removes the book from the given list.
     * @param userId
     * @param bookId
     * @return read list
     */
    public ReadList addOrDeleteReadBook( long userId, long bookId) {
        Optional<User> user = userRepository.getById(userId);
        Optional<Book> book = bookRepository.findById(bookId);

        if(user.isPresent()){
            if(book.isPresent()){

                Optional<ReadList> readListEntity = readListRepository.findByUserAndBook(user.get(), book.get());

                if( !readListEntity.isPresent()){
                    ReadList savedEntity = new ReadList();
                    savedEntity.setReadByUser(user.get());
                    savedEntity.setReadBook(book.get());
                    savedEntity.setReadDate(new Date());

                    return readListRepository.save(savedEntity);
                } else {
                    readListRepository.delete(readListEntity.get());
                    return readListEntity.get();
                }
            }
            throw new IllegalArgumentException(BOOK_NOT_FOUND);
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }

    /**
     * This method gets all the books in user's favorite list.
     * @param userId
     * @param pageSize
     * @param pageNumber
     * @return
     */
    public Page<Object>  getFavoriteList(long userId, int pageSize, int pageNumber){
        Pageable paged = PageRequest.of( pageNumber, pageSize);
        Optional<User> user = userRepository.getById(userId);
        if(user.isPresent()){
            List<Object> books = favoriteListRepository.findByUser(user.get());
            return new PageImpl<>(books, paged, books.size());
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }

    public List<Book> getFavoriteList(long userId){
        Optional<User> user = userRepository.getById(userId);
        if(user.isPresent()){
            return favoriteListRepository.findBookByUser(user.get());
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }


    /**
     * This method gets all the books in user's read list.
     * @param userId
     * @param pageSize
     * @param pageNumber
     * @return
     */
    public Page<Object> getReadList( long userId, int pageSize, int pageNumber){
        Pageable paged = PageRequest.of( pageNumber, pageSize);
        Optional<User> user = userRepository.getById(userId);
        if(user.isPresent()){
            List<Object> books = readListRepository.findByUser(user.get());
            return new PageImpl<>(books, paged, books.size());
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }

    public List<Book> getReadList(long userId){
        Optional<User> user = userRepository.getById(userId);
        if(user.isPresent()){
            return readListRepository.findBookByUser(user.get());
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(username);
        if( byUsername.isPresent()){
            return new MyUserDetails(byUsername.get());
        }
        throw new IllegalArgumentException(USER_NOT_FOUND);
    }

}