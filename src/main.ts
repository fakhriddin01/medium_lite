import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core"

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule, {cors: true})
        const PORT = process.env.PORT || 3000;
        app.setGlobalPrefix('api');


    app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`);
        
    });
    } catch (error) {
        console.log(error);        
    }    
}

start();