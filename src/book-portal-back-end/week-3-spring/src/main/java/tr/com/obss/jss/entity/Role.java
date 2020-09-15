package tr.com.obss.jss.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

/**
 * This is Role Entity class.
 * It includes only name column and a join table which is used to define users' roles.
 * There are two roles which are ADMIN and USER in this system.
 */
@Entity
@Table(name = "ROLE")
public class Role extends EntityBase{

    @Column(name = "NAME", length = 255, unique = true)
    private String name;

    // USERS_ROLES Join Table
    @ManyToMany(mappedBy = "roles")
    @JsonBackReference
    private List<User> users;

    //* GETTER & SETTER METHODS *//
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}