import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Post } from "../../post/models/post.model";
import { User } from "../../user/models/user.model";

interface PostRateCreatAttr{
    post_id: number;
    user_id: number;
    rate: number;
}

@Table({tableName: 'post_rate'})
export class PostRate extends Model<PostRate, PostRateCreatAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=> Post)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    post_id: number;

    @ForeignKey(()=> User)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    user_id: number;

    @Column({
        type:DataType.DECIMAL,
        allowNull:false
    })
    rate: number;
}
