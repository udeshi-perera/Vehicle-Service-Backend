import { Module } from '@nestjs/common';
import { FileExportResolver } from './file-export.resolver';
import { VehicleService } from './vehicle.service';

@Module({
    imports:[],
    providers: [FileExportResolver, VehicleService]
})
export class VehicleModule {}
