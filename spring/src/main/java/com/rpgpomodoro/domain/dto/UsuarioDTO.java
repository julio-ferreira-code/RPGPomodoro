package com.rpgpomodoro.domain.dto;

import org.modelmapper.ModelMapper;

import com.rpgpomodoro.domain.Usuario;

import lombok.Data;

@Data
public class UsuarioDTO {

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
	
	public static UsuarioDTO create(Usuario c) {
		ModelMapper modelMapper = new ModelMapper();
		return modelMapper.map(c, UsuarioDTO.class);
	}
	
}
