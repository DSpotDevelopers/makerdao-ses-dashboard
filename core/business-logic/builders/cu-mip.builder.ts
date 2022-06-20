import { CuMipDao, Mip40Dao, Mip41Dao } from '../../../stories/containers/cu-table/cu-table.api';
import { setCuMipStatusModifiedDate } from '../core-units';
import { CuStatusEnum } from '../../enums/cu-status.enum';

export class CuMipBuilder {
  private readonly _cuMip: CuMipDao;

  constructor() {
    this._cuMip = {
      mipStatus: '',
      mip40: [] as Mip40Dao[],
      mip41: [] as Mip41Dao[],
      accepted: '',
      rejected: '',
      rfc: '',
      formalSubmission: '',
      obsolete: '',
    } as CuMipDao;
  }

  withStatus(status: CuStatusEnum, date: string): CuMipBuilder {
    this._cuMip.mipStatus = status;
    setCuMipStatusModifiedDate(this._cuMip, status, date);
    return this;
  }

  addMip40(mip40: Mip40Dao): CuMipBuilder {
    this._cuMip.mip40.push(mip40);
    return this;
  }

  addMip41(mip41: Mip41Dao): CuMipBuilder {
    this._cuMip.mip41.push(mip41);
    return this;
  }

  build(): CuMipDao {
    return this._cuMip;
  }
}