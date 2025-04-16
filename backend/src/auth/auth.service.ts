import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {

    }
    async signup(data: SignUpDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        })
        
        if (user) throw new UnauthorizedException('User alredy exists');

        const hash = await bcrypt.hash(data.password, 10);

        const newUser = await this.prismaService.user.create({ data: {
            ...data,
            password: hash,
        } });
        return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name
        };
    }
    async signin(data: SignInDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (!user) throw new UnauthorizedException('User data invalid');


        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) throw new UnauthorizedException('User data invalid');

        const token = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email
        });

        
        return { token };
    }
}
