package tr.com.obss.jss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.entity.*;
import tr.com.obss.jss.model.UserDTO;
import tr.com.obss.jss.model.UserUpdateDTO;
import tr.com.obss.jss.service.UserService;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    // Properties
    private UserService userService;

    // Constructor
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    /**
     * This method saves a new user to database.
     * @param userDTO
     * @return
     */
    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> post(@Valid @RequestBody UserDTO userDTO){
        User user = userService.save(userDTO);
        return ResponseEntity.ok(user);
    }

    /**
     * This method updates user's password.
     * @param id
     * @param userDTO
     * @return
     */
    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody UserUpdateDTO userDTO){
        User user = userService.update(id, userDTO);
        return ResponseEntity.ok(user);
    }

    /**
     * This method changes user's "active" status.
     * It performs soft delete on user by deactivating if user is active.
     * Otherwise, it reactivate user.
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable long id){
        User user = userService.delete(id);
        return ResponseEntity.ok(user);
    }


    /**
     * This method returns users in page format.
     * It also searches users according to username.
     * @param pageSize
     * @param pageNumber
     * @param username
     * @return
     */
    @GetMapping("")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> get(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                 @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                 @RequestParam(name = "username", defaultValue = "") String username){
        return ResponseEntity.ok(userService.findAll(pageSize, pageNumber, username));
    }

    /**
     * This method returns the user with given id.
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> get(@PathVariable long id){
        Optional<User> userOptional = userService.findById(id);
        if( userOptional.isPresent()){
            return ResponseEntity.ok(userOptional.get());
        }
        throw new IllegalArgumentException("User is not found!");
    }

    /**
     * This method returns the user with given username.
     * @param username
     * @return
     */
    @GetMapping("/getByUsername")
    @ResponseBody
    public ResponseEntity<?> getByUsername(@RequestParam(name = "username", defaultValue = "") String username){
        Optional<User> userList = userService.findByUsername(username);
        return ResponseEntity.ok(userList);
    }


    /**
     * This method returns the users who have USER ROLE.
     * @return
     */
    @GetMapping("/has-role-user")
    @ResponseBody
    public ResponseEntity<?> findByRoles(){
        List<User> userList = userService.findByRoles(Arrays.asList("ROLE_USER"));
        return ResponseEntity.ok(userList);
    }

    /**
     * This method adds the given book to the user's favorite list.
     * @param userId
     * @param bookId
     * @return
     */
    @GetMapping("/like-book")
    @ResponseBody
    public ResponseEntity<?> likeBook(@RequestParam(name = "userId", defaultValue = "") long userId,
                                      @RequestParam(name = "bookId", defaultValue = "") long bookId){
        FavoriteList favoriteList = userService.addOrDeleteLikedBook(userId, bookId);
        return ResponseEntity.ok(favoriteList);
    }


    /**
     * This method adds the given book to the user's read list.
     * @param userId
     * @param bookId
     * @return
     */
    @GetMapping("/read-book")
    @ResponseBody
    public ResponseEntity<?> readBook(@RequestParam(name = "userId", defaultValue = "") long userId,
                                      @RequestParam(name = "bookId", defaultValue = "") long bookId){
        ReadList readList = userService.addOrDeleteReadBook(userId, bookId);
        return ResponseEntity.ok(readList);
    }

    /**
     * This method returns user's favorite list as page format.
     * @param userId
     * @param pageSize
     * @param pageNumber
     * @return
     */
    @GetMapping("/get-favorite-list-page")
    @ResponseBody
    public ResponseEntity<?> getFavoriteListPage(@RequestParam(name = "userId", defaultValue = "") long userId,
                                                 @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                                 @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber){
        Page<Object> favoriteList = userService.getFavoriteList(userId, pageSize, pageNumber);
        return ResponseEntity.ok(favoriteList);
    }

    /**
     * This method returns user's read list as page format.
     * @param userId
     * @param pageSize
     * @param pageNumber
     * @return
     */
    @GetMapping("/get-read-list-page")
    @ResponseBody
    public ResponseEntity<?> getReadListPage(@RequestParam(name = "userId", defaultValue = "") long userId,
                                                 @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                                 @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber){
        Page<Object> readList = userService.getReadList(userId, pageSize, pageNumber);
        return ResponseEntity.ok(readList);
    }


    @GetMapping("/get-favorite-list")
    @ResponseBody
    public ResponseEntity<?> getFavoriteList(@RequestParam(name = "userId", defaultValue = "") long userId){
        List<Book> favoriteList = userService.getFavoriteList(userId);
        return ResponseEntity.ok(favoriteList);
    }

    @GetMapping("/get-read-list")
    @ResponseBody
    public ResponseEntity<?> getReadList(@RequestParam(name = "userId", defaultValue = "") long userId){
        List<Book> readList = userService.getReadList(userId);
        return ResponseEntity.ok(readList);
    }


}
