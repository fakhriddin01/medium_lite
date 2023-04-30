import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Post } from "../../post/models/post.model";

interface MediaCreatAttr{
    post_id: number;
    media: string;
}

@Table({tableName: 'media'})
export class Media extends Model<Media, MediaCreatAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @ForeignKey(()=>Post)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    post_id: number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    media: string;

    @BelongsTo(()=>Post)
    post: Post
}
