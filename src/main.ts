import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule, {cors: true})
        const PORT = process.env.PORT || 3000;
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new ValidationPipe());
        app.use((req, res, next)=>{
            const startTime = Date.now();
            const start = new Date(startTime)
            res.on('finish', ()=>{
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                console.log(`${req.method}; ${req.originalUrl}; ${res.statusCode}; ${responseTime}ms; at:${start.toString()}`);
            });
            next();
        })

        const config = new DocumentBuilder()
            .setTitle('Medium Lite')
            .setDescription('REST API')
            .setVersion('1.0.0')
            .addTag('NodeJS, NestJS, Postgres, sequlize')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);        
        app.listen(PORT, ()=> {
            console.log(`Server is running on ${PORT}`);
        
    });
    } catch (error) {
        console.log(error);        
    }    
}

start();