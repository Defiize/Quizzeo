// Extern import
// ...

// Intern import
// ...

const keywordTextMap = {
    "keyword1" : "text",
};

function getTextWithKeyWord(keyword) {
    const upperCaseKeyword = keyword.toUpperCase();
    return keywordTextMap[upperCaseKeyword] || upperCaseKeyword;
}