package com.insurance.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.management.model.SupportTicketEntity;

@Repository 
//Connection spring boot with mysql database
public interface SupportTicketRepository extends JpaRepository<SupportTicketEntity,Integer>{

}
