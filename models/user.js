module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {

    // ! 시퀄라이즈는 알아서 id를 기본키로 연결하므로 id컬럼은 적어줄 필요가 없다.
    // ? 자료형은 VARCHAR = STRING,   INT = INTEGER  ,  TINYINT = BOOLEAN,    DATETIME = DATE   , UNSIGNED = INTEGER.UNSIGNED
    // ? UNSIGNED : 숫자 자료형에 적용되는 옵션,  INT는 -2147483648 ~ 2147483647 숫자 지정  UNSIGNED지정시 음수는 무시한다. 0 ~ 2147483647
    // ? 나이처럼 음수가 나올 수 없는 컬럼은 UNSIGNED 체크해두면 좋다.   
    // ? allowNull = NOT NULL , defaultValue = DEFAULT(기본값)

        name: {
            type: DataTypes.STRING(20),
            allowNull : false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNull : false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        created_at: {
            type: DataTypes.DATE,
            allowNull : false,
            defaultValue: sequelize.literal('now()'),
        }, 
    }, {
        timestamps: false,
    });
};