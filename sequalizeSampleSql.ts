import { DBCustomError } from "../errors";
import { test, test2 } from "../models";
/**
 * @Entity
 * TB_TEST_20211214
 */
const testModels = test();

/**
 *
 * @Entity
 * TB_TEST_20211214_CONTENT
 */
const testModels2 = test2();

/**
 * @description
 * 테스트 테이블 : TB_TEST_20211214 에 있는 데이터를 find 한다.
 * @returns
 */
export const getTestData = async (TEST_ID?: string) => {
  if (TEST_ID) {
    // Idx 가 존재하는 경우 , 해당 Idx 의 데이터를 find 합니다.
    return testModels
      .findAll({
        where: {
          TEST_ID: TEST_ID,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new DBCustomError(err.message);
      });
  } else {
    // Idx 가 존재하지 않는경우 , 모든 데이터를 find 합니다.
    return testModels
      .findAll({
        //raw: true,
        include: [
          {
            model: testModels2,
            required: true, // inner join 여부 (true : inner join , false : left join)
            /* as:"TB_TEST_20211214_CONTENT",  */ attributes: [
              "TEST_TITLE",
              "TEST_CONTENT",
            ],
          },
        ],
      })
      .catch((err) => {
        console.log(err);
        throw new DBCustomError(err.message);
      });
  }
};
/**
 * @description
 * 테스트 테이블 :TB_TEST_20211214 에 특정 기준의 데이터를 delete 한다.
 * @returns
 */
export const deleteData = async (TEST_ID: string) => {
  return testModels
    .destroy({
      where: { TEST_ID },
    })
    .catch((err) => {
      console.log(err);
      throw new DBCustomError(err.message);
    });
};
/**
 * @description
 * 테스트 테이블 :TB_TEST_20211214 에 데이터를 insert 한다.
 * @returns
 */
export const insertData = async (hashParams: any) => {
  return testModels
    .create({
      TEST_NAME: hashParams.testName,
      TEST_ADDREESS: hashParams.addreess,
    })
    .catch((err) => {
      console.log(err);
      throw new DBCustomError(err.message);
    });
};
/**
 * @description
 * 테스트 테이블 :TB_TEST_20211214 의 특정컬럼의 data를 update 한다.
 * @returns
 */
export const updateData = async (hashParams: any) => {
  return testModels
    .update(
      { TEST_NAME: hashParams.testName, TEST_ADDREESS: hashParams.addreess },
      {
        where: {
          TEST_ID: hashParams.getIdx,
        },
      }
    )
    .catch((err) => {
      console.log(err);
      throw new DBCustomError(err.message);
    });
};
