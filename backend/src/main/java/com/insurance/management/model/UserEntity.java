package com.insurance.management.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



@Entity
@Table(name = "User")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

	@Column(length = 50,nullable = false)
	private String userName;

	@Column(unique = true,nullable = false) 
	private String password;
 
	@Column(length = 100,unique = true)
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
	private String email;

	@Enumerated(EnumType.STRING)
	@Column(length = 100,nullable = false)
	private Location location;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;

	public enum Role {
		ADMIN, AGENT, CUSTOMER
	}

	public enum Location {
		WHITEFIELD, BAGMANE, MANYATA, BANGALORE
	}

	public UserEntity() {
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

}
