import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { Post } from "../../post/models/post.model";
import { PostRate } from "../../post-rate/models/post-rate.model";

interface UserCreationAttr {
    username: string;
    email: string;
    hashed_password: string;
    image: string;
    hashed_refresh_token: string;
    is_active: boolean;
    user_rate: number;
}

@Table({tableName: "user"})
export class User extends Model<User, UserCreationAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    username: string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true,
    })
    email: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type:DataType.DECIMAL,
        defaultValue: null
    })
    user_rate: number;
    
    @Column({
        type:DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: boolean;

    @Column({
        type:DataType.STRING,
    })
    image: string;

    @HasMany(()=>Post)
    posts: Post[]
    

}
