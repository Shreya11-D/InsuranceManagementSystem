package com.insurance.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.insurance.management.exception.ResourceNotFoundException;
import com.insurance.management.exception.UserNotFoundException;
import com.insurance.management.model.UserEntity;
import com.insurance.management.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public UserEntity registerUser(UserEntity user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(UserEntity.Role.CUSTOMER); // Default role
		return userRepository.save(user);
	}

	public void logOut(Integer userId) {
		if (userId == null) {
			// No user ID provided — treat as anonymous logout
			return;
		}

		if (!userRepository.existsById(userId)) {
			// User doesn't exist — optionally log or ignore
			return;
		}
	}

	public UserEntity getUserProfile(int userId) {
		return userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id:" + userId));
	}

	public List<UserEntity> getAllUsers() {
		return userRepository.findAll();
	}

	public Optional<UserEntity> login(String userName, String rawPassword) {
		Optional<UserEntity> userOpt = userRepository.findByUserName(userName);
		if (userOpt.isPresent()) {
			UserEntity user = userOpt.get();
			if (passwordEncoder.matches(rawPassword, user.getPassword())) {
				return Optional.of(user);
			}
		}
		return Optional.empty();
	}

}