# 타입스크립트 + 익스프레스 + 시퀄라이즈

# 시퀄라이즈 모델 정의
``` typescript
interface testType extends Model {
  TEST_ID : number;
  TEST_NAME : string;
  TEST_ADDREESS : string;
}


```
``` typescript
import { Model, BuildOptions, DataTypes } from "sequelize";
import { sequelize, Sequelize } from ".";
import { testType } from "../types/models";

export type testModels = typeof Model & {
  new (values?: object, options?: BuildOptions): testType;
};

export default () => {
  return <testModels>sequelize.define(
    "TB_TEST_20211214",
    {
      TEST_ID: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      TEST_NAME: {
        type: DataTypes.STRING(),
      },

      TEST_ADDREESS: {
        type: DataTypes.STRING(),
      },

      createdAt: {
        type: DataTypes.DATE(3),
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updatedAt: {
        type: DataTypes.DATE(3),
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
    },

    {
      indexes: [
        {
          unique: true,
          fields: ["TEST_ID"],
        },
      ],
      tableName: "TB_TEST_20211214",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};


```

# 시퀄라이즈 테이블 생성 
``` typescript
export const addTable = async () => {
  modelAssociationHandler.associateModels();
  // testModel table create 
  const testModel = test();

  // table 확인, 없으면 create
  File.sync()
    .then(async () => {
      console.log("✅Success Create test Table");
      return testModel.sync();
    })
    .then(() => {
      console.log("checked");
    })
    .catch((err) => {
      console.log("❗️Error in Table init : ", err);
    });
};


```


# find (조회)
![find](https://user-images.githubusercontent.com/69393030/146136216-a4b5c391-20bf-4732-95a4-dfbbb59fa66a.PNG)

idx 로 특정 idx 의 게시글을 find 한다.

idx 가 없는경우 전체 게시글을 find 한다.

![scheme](https://user-images.githubusercontent.com/69393030/146136338-967c2736-3c48-4c6d-9d7c-25ae92cfc92a.PNG)

조건을 걸고 find 할 경우 method 는 
``` typescript
  .findAll({
        where: {
          TEST_ID: TEST_ID,
        },
      })
```
http method 는 get 이다. 
# delete (삭제)
![delete](https://user-images.githubusercontent.com/69393030/146136991-fb4576dd-d4c6-4075-9050-d0d11273b574.PNG)

idx 로 특정 idx 의 게시글을 delete 한다.

![삭제](https://user-images.githubusercontent.com/69393030/146137063-281af510-7e4e-4526-9db6-66a6c98882c5.PNG)

이때 삭제method 는 
``` typescript
.destroy({
      where: { TEST_ID },
    })
```

이며 , where 은 삭제 조건이다.


![ㅊㄱㄷㅁㄱㄷ](https://user-images.githubusercontent.com/69393030/146137874-287b9d74-8dc8-4441-ad36-27a923243fd5.PNG)

http method 는 delete 이다.

# insert (삽입)
![삽입](https://user-images.githubusercontent.com/69393030/146137579-468b2074-7890-48f4-97fd-759e52d5c862.PNG)

![ㅊㄱㄷㅁㄱㄷ](https://user-images.githubusercontent.com/69393030/146137895-26209544-c794-449c-afa3-6dc2c198cfc6.PNG)

이때 insert method는 
``` typescript
.create({
      TEST_NAME: hashParams.testName,
      TEST_ADDREESS: hashParams.addreess,
    })
    
```
http method 는 post 이다. 


# update (수정)

![updat](https://user-images.githubusercontent.com/69393030/146138151-74ea6474-5f61-4a6a-9665-60a3162ead18.PNG)

![234234](https://user-images.githubusercontent.com/69393030/146138332-f9b57968-22c9-4bd4-a302-9842af35bbfa.PNG)

특정 컬럼의 data 를 update 한다.

이때 update method 는 
``` typescript
.update(
      { TEST_NAME: hashParams.testName, TEST_ADDREESS: hashParams.addreess },
      {
        where: {
          TEST_ID: hashParams.getIdx,
        },
      }
    )

```
이다 , 

http method 는 post / put 을 사용한다.

# left join (left outer join)
``` typescript

export type testModels = typeof Model & {
  new (values?: object, options?: BuildOptions): testType;
};

export default () => {
  const testModel2 = testModels2();
  const testModels = <testModels>sequelize.define(
    "TB_TEST_20211214",
    {
      TEST_ID: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      TEST_NAME: {
        type: DataTypes.STRING(),
      },

      TEST_ADDREESS: {
        type: DataTypes.STRING(),
      },

      createdAt: {
        type: DataTypes.DATE(3),
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updatedAt: {
        type: DataTypes.DATE(3),
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
    },

    {
      indexes: [
        {
          unique: true,
          fields: ["TEST_ID"],
        },
      ],
      tableName: "TB_TEST_20211214",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

/**
 * join 을 위한 method 
 */
  testModels.belongsTo(testModel2, {
    foreignKey: "TEST_ID",
   // as: "TB_TEST_20211214_CONTENT",
  });

/*
  testModels.hasMany(testModel2, {
    foreignKey: "TEST_ID",
    as: "testId",
  });
*/


  return testModels;

};


```

시퀄라이저에서 left join 을 사용할시 , 기준이 되는 테이블 엔티티 (model) 에 join method 를 선언해주면된다.

``` typescript
 testModels.belongsTo(testModel2, {
    foreignKey: "TEST_ID",
   // as: "TB_TEST_20211214_CONTENT",
  });

```
저 코드에서 , testModels.belongsto (testModel2 )  이렇게 되어있는데 이것은 

testModels 를 기준으로 testModel2 를 left 조인 하겠다는 것이다. 

sql 로  치면,

select * from testModels t1 left join testModel2 t2 on t1.TEST_ID = t2.TEST_ID 



![left join](https://user-images.githubusercontent.com/69393030/146158594-04f60591-5b24-4a7c-9477-e51bcff9712e.PNG)


left 조인은 join 할 테이블 entity ( model ) 을 include : [] 통해서 사용할수있다.

``` typescript
include:[
          {model:testModels2, /* as:"TB_TEST_20211214_CONTENT",  */attributes:["TEST_TITLE" , "TEST_CONTENT"]},
        ]
```
위 코드를 보면 

model : 조인할 테이블 ( 설정한 모델 엔티티 )

as : 사용할 테이블 별칭 

attributes : 조인해서 가져올 컬럼 들을 위와 같이 작성하면된다. 
