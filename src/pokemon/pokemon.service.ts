import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    // Decorador que permtite usar el modelo de mongo como servicio
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = configService.get<number>('defaultLimit')
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = this.pokemonModel.create(createPokemonDto)
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }

  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10 /* this.defaultLimit */, offset = 0 } = paginationDto
    try {
      const pokemons = await this.pokemonModel.find()
                              .limit(limit)
                              .skip(offset)
                              .sort({
                                nro: 1
                              })
                              .select('-__v')
      return pokemons;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findOne(term: string) {
    let pokemon: Pokemon
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({
        nro: term
      })
    }

    // MongoID
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    // Pokemon Name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()})
    }

    if(!pokemon) 
      throw new NotFoundException(`Pokemon with id, name or nro '${term}' not found.`)

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
      const pokemon = await this.findOne(term)
      if(updatePokemonDto.name) 
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

      try {
        await pokemon.updateOne(updatePokemonDto)        
        return {...pokemon.toJSON(), ...updatePokemonDto}
      } catch (error) {
        this.handleExceptions(error)
      }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne()
    // Hay que manejar los erroes
    // const result = await this.pokemonModel.findByIdAndDelete(id)
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id, 
    })

    if(deletedCount === 0) 
      throw new BadRequestException(`Pokemon with '${id} not found'`)

    return
  }

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)      
    }
    throw new InternalServerErrorException(`Can't create pokemon - Check Server logs`)
  }
}
