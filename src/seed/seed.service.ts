import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '@/pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios
  constructor(
    // Decorador que permtite usar el modelo de mongo como servicio
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>
  ){}
  // https://pokeapi.co/api/v2/pokemon?limit=650
  async executeSeed() {

    await this.pokemonModel.deleteMany({})

    const { data }= await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    // const insertPomisesArray = [];
    const pokemonToInsert: {name: string, nro: number}[] = []

    data.results.forEach( ({ name, url }) => {
      const segments = url.split('/')
      const nro: number = +segments[segments.length - 2]
      const newPokemon = { name, nro }
      console.log({ name, nro })

      // const pokemon = await this.pokemonModel.create({ name, nro })
      // insertPomisesArray.push(this.pokemonModel.create(newPokemon))
      pokemonToInsert.push(newPokemon)
    })

    // await Promise.all(insertPomisesArray)
    await this.pokemonModel.insertMany(pokemonToInsert)
    
    return 'Seed executed'
  }
}
