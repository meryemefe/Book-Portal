package tr.com.obss.jss.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * This is a super class for other entities
 * which includes id, create / update date, operation type, and active status.
 */
@MappedSuperclass
public class EntityBase implements Serializable {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "CREATE_DATE")
    private Date createDate;

    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    @Column(name = "ACTIVE")
    private boolean active;

    @Column(name = "OPERATION_TYPE")
    private String operationType;

    //* PRE-OPERATION METHODS *//
    @PrePersist
    public void onPrePersist(){
        this.setOperationType("SAVE");
        this.setCreateDate(new Date());
        this.setUpdateDate(new Date());
        this.setActive(true);
    }

    @PreUpdate
    public void onPreUpdate(){
        this.setOperationType("UPDATE");
        this.setUpdateDate(new Date());
    }

    @PreRemove
    public void onPreRemove(){
        this.setOperationType("DELETE");
        this.setUpdateDate(new Date());
    }

    //* GETTER & SETTER METHODS *//
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }
}