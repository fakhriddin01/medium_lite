import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { PostRate } from "../../post-rate/models/post-rate.model";
import { Media } from "../../media/models/media.model";

interface PostCreatAttr {
    title: string;
    content: string;
    read_time: number;
    user_id: number;
    rating: number;
}

@Table({tableName: "Post"})
export class Post extends Model<Post, PostCreatAttr> {
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
    title: string;

    @Column({
        type:DataType.TEXT,
        allowNull:false,
    })
    content: string;

    @Column({
        type:DataType.INTEGER,
    })
    read_time: number;

    @Column({
        type:DataType.DECIMAL,
        defaultValue: null
    })
    average_rating: number;

    @ForeignKey(()=> User)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    user_id: number;

    @BelongsTo(()=>User)
    Author: User

    @HasMany(()=>PostRate)
    ratings: PostRate[]

    @HasMany(()=>Media)
    media: Media[]
}
