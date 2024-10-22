import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document{ // extends Document para que se tome como un documento en mongo
  
  @Prop({
    unique: true,
    index: true
  })
  name: string;

  @Prop({
    unique: true,
    index: true
  })
  nro: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)