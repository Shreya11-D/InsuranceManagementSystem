package com.insurance.management.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.management.dto.SupportTicketDTO;
import com.insurance.management.model.SupportTicketEntity;
import com.insurance.management.service.SupportTicketService;

@RestController
@RequestMapping("/api/ticket")
public class SupportTicketController {

	private static final Logger log = LoggerFactory.getLogger(SupportTicketController.class);

	@Autowired
	private SupportTicketService supportTicketService;

	@PostMapping
	public ResponseEntity<?> createTicket(@RequestBody SupportTicketDTO dto) {
		log.info("Request createticket for the dto={}", dto.ticketId());

		SupportTicketEntity createdTicket = supportTicketService.createTicket(dto);
		log.info("Response createticket for the dto={} is successfull", createdTicket);
		return ResponseEntity.status(HttpStatus.CREATED).body("Ticket created successfully");
	}

	@GetMapping("/{ticketId}")
	public ResponseEntity<?> getTicketById(@PathVariable int ticketId) {
		log.info("Request get ticket for the id={}", ticketId);
		SupportTicketDTO dto = supportTicketService.getTicketDetails(ticketId);
		log.info("Response get ticket for the id={}", dto.ticketId());
		return ResponseEntity.ok(dto);
	}

	@GetMapping
	public ResponseEntity<?> getAllTickets() {
		log.info("Request to get Allticket");
		List<SupportTicketDTO> tickets = supportTicketService.getAllTickets();
		log.info("Request for Allticket");
		return ResponseEntity.ok(tickets);
	}

	@PutMapping("/resolve/{ticketId}")
	public ResponseEntity<?> resolveTicket(@PathVariable int ticketId) {
		log.info("Request ticket update for the id={}", ticketId);
		SupportTicketDTO resolvedTicket = supportTicketService.resolveTicket(ticketId);
		log.info("updated successfully for claimid={}", ticketId);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(resolvedTicket.ticketId());
	}
}