package tr.com.obss.jss.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

/**
 * This is User Entity class.
 * It includes username and password columns
 * as well as three join tables which are user's roles, user's favorite list and read list.
 */
@Entity
@Table(name = "USER")
public class User extends EntityBase{

    //* COLUMNS *//

    @Column(name = "USERNAME", length = 255, unique = true)
    private String username;

    @Column(name = "PASSWORD", length = 255)
    private String password;

    //* JOIN TABLES *//

    // USERS_ROLES Join Table
    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "USERS_ROLES",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")})
    @JsonManagedReference
    private List<Role> roles;

    // FAVORITE_LIST Join Table
    @OneToMany(mappedBy = "likedByUser", fetch = FetchType.LAZY)
    @ElementCollection(targetClass = FavoriteList.class)
    private List<FavoriteList> likedBookList;

    // READ_LIST Join Table
    @OneToMany(mappedBy = "readByUser", fetch = FetchType.LAZY)
    @ElementCollection(targetClass = ReadList.class)
    private List<ReadList> readBookList;

    //* GETTER & SETTER METHODS *//
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<FavoriteList> getLikedBookList() {
        return likedBookList;
    }

    public void setLikedBookList(List<FavoriteList> likedBookList) {
        this.likedBookList = likedBookList;
    }

    public List<ReadList> getReadBookList() {
        return readBookList;
    }

    public void setReadBookList(List<ReadList> readBookList) {
        this.readBookList = readBookList;
    }
}