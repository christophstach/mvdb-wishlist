import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDto } from './dtos/add-to-wishlist.dto';

@ApiTags('wishlist')
@ApiBearerAuth()
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findByOwner(@Req() req) {
    const owner = req.user.googleId;
    return this.wishlistService.findByOwner(owner);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  add(@Req() req, @Body() addToWishlistDto: AddToWishlistDto) {
    const owner = req.user.googleId;
    return this.wishlistService.add(owner, addToWishlistDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req, @Param('id') id: string) {
    const owner = req.user.googleId;
    return this.wishlistService.remove(owner, id);
  }
}
