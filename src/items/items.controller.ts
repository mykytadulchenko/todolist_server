import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ItemsService } from './items.service';
import { createItemDto } from './dto/create-item.dto';
import { selectAllDto } from './dto/select-all.dto';
import { editItemDto } from './dto/edit-item.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from './items.entity';

@ApiTags('List endpoints')
@ApiBearerAuth('Bearer token auth')
@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @ApiOperation({ summary: 'Gets all items of current user'})
    @ApiResponse({ status: 200, description: 'Returns array of todolist items', type: [Item] })
    @UseGuards(JwtGuard)
    @Get('/:id')
    async getItems(@Param('id') id: string) {
        const response = await this.itemsService.getItems(id)
        return response
    }

    @ApiOperation({ summary: 'Adds new item'})
    @ApiResponse({ status: 200, description: 'Returns array of todolist items', type: [Item] })
    @UseGuards(JwtGuard)
    @Post()
    async addItem(@Body() dto: createItemDto) {
        const { value, userId } = dto
        const response = await this.itemsService.addItem(value, userId)
        return response
    }

    @ApiOperation({ summary: 'Bulk action: marks as selected all user`s items'})
    @ApiResponse({ status: 200, description: 'Returns array of todolist items', type: [Item] })
    @UseGuards(JwtGuard)
    @Put('/bulk-select')
    async selectAll(@Body() dto: selectAllDto) {
        const { selectAll, userId } = dto
        const response = await this.itemsService.selectAll(selectAll, userId)
        return response
    }

    @ApiOperation({ summary: 'Edits single item'})
    @ApiResponse({ status: 200, description: 'Returns array of todolist items', type: [Item] })
    @UseGuards(JwtGuard)
    @Put('/:id')
    async editItem(@Body() dto: editItemDto) {
        const { id, value, completed, user_id } = dto
        const response = await this.itemsService.editItem(id, value, completed, user_id)
        return response
    }

    @ApiOperation({ summary: 'Bulk action: removes all selected items of current user'})
    @ApiResponse({ status: 200, description: 'Returns array of todolist items', type: [Item] })
    @UseGuards(JwtGuard)
    @Delete('/bulk-remove')
    async removeSelected(@Req() request: Request) {
        const response = await this.itemsService.removeSelected(request.user.id)
        return response
    }

    @ApiOperation({ summary: 'Deletes single item'})
    @ApiResponse({ status: 200, description: 'Returns array of todolist items', type: [Item] })
    @UseGuards(JwtGuard)
    @Delete('/:id')
    async deleteItem(@Param('id') id: string, @Req() request: Request) {
        console.log('test')
        const response = await this.itemsService.deleteItem(id, request.user.id)
        return response
    }

    // @UseGuards(JwtGuard)
    // @Put('/bulk-select')
    // async selectAll(@Body() requestData) {
    //     console.log('TEST')
    //     const { selectAllFlag, userId } = requestData
    //     const response = await this.itemsService.selectAll(selectAllFlag, userId)
    //     return response
    // }

    // @UseGuards(JwtGuard)
    // @Delete('/bulk-remove')
    // async removeSelected(@Body() requestData) {
    //     console.log(requestData)
    //     const { userId } = requestData
    //     const response = await this.itemsService.removeSelected(userId)
    //     return response
    // }
}
