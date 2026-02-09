package com.insurance.management.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.insurance.management.dto.SupportTicketDTO;
import com.insurance.management.exception.ResourceNotFoundException;
import com.insurance.management.model.SupportTicketEntity;
import com.insurance.management.model.UserEntity;
import com.insurance.management.model.SupportTicketEntity.TicketStatus;
import com.insurance.management.repository.SupportTicketRepository;
import com.insurance.management.repository.UserRepository;

@Service
public class SupportTicketService {

	private SupportTicketRepository supportTicketRepository;
	private UserRepository userRepository;

	public SupportTicketService(SupportTicketRepository supportTicketRepository, UserRepository userRepository) {
		super();
		this.supportTicketRepository = supportTicketRepository;
		this.userRepository = userRepository;
	}

	public SupportTicketEntity createTicket(SupportTicketDTO dto) {
		SupportTicketEntity entity = new SupportTicketEntity();

		// Fetch user by ID
		UserEntity user = userRepository.findById(dto.userId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + dto.userId()));

		// Map DTO to Entity
		entity.setUserEntity(user);
		entity.setIssueDescription(dto.issueDescription());
		entity.setTicketStatus(dto.ticketStatus());
		entity.setCreatedDate(dto.createdDate());
		entity.setResolvedDate(dto.resolvedDate());

		return supportTicketRepository.save(entity);
	}

	public SupportTicketDTO getTicketDetails(int ticketId) {
		SupportTicketEntity entity = supportTicketRepository.findById((int) ticketId)
				.orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + ticketId));

		return new SupportTicketDTO(entity.getTicketId(), entity.getUserEntity().getUserId(),
				entity.getIssueDescription(), entity.getTicketStatus(), entity.getCreatedDate(),
				entity.getResolvedDate());
	}

	public List<SupportTicketDTO> getAllTickets() {
		List<SupportTicketEntity> entities = supportTicketRepository.findAll();

		return entities.stream()
				.map(entity -> new SupportTicketDTO(entity.getTicketId(), entity.getUserEntity().getUserId(),
						entity.getIssueDescription(), entity.getTicketStatus(), entity.getCreatedDate(),
						entity.getResolvedDate()))
				.collect(Collectors.toList());
	}

	public SupportTicketDTO resolveTicket(int ticketId) {

		SupportTicketEntity existingTicket = supportTicketRepository.findById(ticketId)
				.orElseThrow(() -> new ResourceNotFoundException("Support ticket not found with id: " + ticketId));

		if (existingTicket.getTicketStatus() != TicketStatus.RESOLVED) {
			existingTicket.setTicketStatus(TicketStatus.RESOLVED);
			existingTicket.setResolvedDate(LocalDate.now());
			supportTicketRepository.save(existingTicket);
		}

		return new SupportTicketDTO(existingTicket.getTicketId(), existingTicket.getUserEntity().getUserId(),
				existingTicket.getIssueDescription(), existingTicket.getTicketStatus(), existingTicket.getCreatedDate(),
				existingTicket.getResolvedDate());
	}

}
