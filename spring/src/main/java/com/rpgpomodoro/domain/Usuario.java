package com.rpgpomodoro.domain;

import javax.persistence.*;

import lombok.*;

@Entity
@Data
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	private String email;
	private String senha;
	private String nomePet;
	private int levelPet;
	private double pontosExpPet;
	private String racaPet;
	private double poderPet;
	private String imagemPet;
}
