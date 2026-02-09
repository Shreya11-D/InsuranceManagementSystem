package com.insurance.management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.management.model.UserEntity;
import com.insurance.management.security.JwtUtil;
import com.insurance.management.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserEntity loginRequest) {
		String username = loginRequest.getUserName();
		String password = loginRequest.getPassword();

		Optional<UserEntity> userOpt = userService.login(username, password);

		if (userOpt.isPresent()) {
			UserEntity user = userOpt.get();
			String token = jwtUtil.generateToken(username);

			Map<String, String> response = new HashMap<>();
			response.put("token", token);
			response.put("username", username);
			response.put("role", user.getRole().name()); // ✅ Add this line

			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(401).body("Invalid credentials");
		}
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserEntity user) {
		log.info("Request register for the userEntity={}", user.getUserId());
		UserEntity savedUser = userService.registerUser(user);
		log.info("Response register for the userEntity={} is successfull", user.getUserId());
		return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserProfile(@PathVariable int userId) {
		log.info("Request get user for the id={}", userId);
		UserEntity userProfile = userService.getUserProfile(userId);
		log.info("Response get user for the id={}", userId);
		return ResponseEntity.ok(userProfile);
	}

	@GetMapping
	public ResponseEntity<List<UserEntity>> getAllUsers() {
		log.info("Request for get alluser");
		List<UserEntity> users = userService.getAllUsers();
		log.info("Response for get alluser");
		return ResponseEntity.ok(users);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logOut(@RequestParam(required = false) Integer userId) {
		log.info("Request user for logout");
		if (userId != null) {
			// Optional: check if user exists and perform logout logic
			// Example: invalidate session, clear tokens, etc.
		}

		// Always return success, even if userId is not provided
		log.info("Response user for logout");
		return ResponseEntity.ok("Logged out successfully...");
	}

}