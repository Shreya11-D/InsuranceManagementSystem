package com.insurance.management.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<String> handleEnumConversionError(HttpMessageNotReadableException ex) {
		log.error("HttpMessageNotReadableException");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
				"Invalid input: Please check enum values or JSON format. " + ex.getMostSpecificCause().getMessage());
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<String> handleUrlError(NoHandlerFoundException ex) {
		log.error("Error occur with reason NoHandlerFoundException");
		return new ResponseEntity<>("URL not found: " + ex.getRequestURL(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleIdNotFoundError(ResourceNotFoundException ex) {
		log.error("Error occur with reason ResourceNotFoundException");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + ex.getMessage());
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<String> handleIllegalError(IllegalArgumentException ex) {
		log.error("Error occur with reason IllegalArgumentException");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + ex.getMessage());
	}

	@ExceptionHandler(ClaimIDNotFoundException.class)
	public ResponseEntity<String> handleClaimIdNotFoundError(ClaimIDNotFoundException ex) {
		log.error("Error occur with reason ClaimIDNotFoundException");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + ex.getMessage());
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<String> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
		log.error("Error occur with reason HttpRequestMethodNotSupportedException");
		return new ResponseEntity<>("Request method '" + ex.getMethod() + "' is not supported for this endpoint.",
				HttpStatus.METHOD_NOT_ALLOWED);
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> handleUser(UserNotFoundException ex) {
		log.error("Error occur with reason UserNotFoundException");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with username: " + ex.getMessage());
	}
	
	
	@ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Map<String, String>> handleUnauthorizedException(UnauthorizedException ex) {
		log.error("Error occur with reason handleUnauthorizedException");
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Unauthorized");
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

   @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleExceptions(Exception ex) {
	   log.error("Error occur with reason Exception");
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Internal Server Error");
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
//	@ExceptionHandler(Exception.class)
//	public ResponseEntity<String> handleException(Exception ex) {
//		log.error("Error occur with reason Exception");
//		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + ex.getMessage());
//	}

	
}