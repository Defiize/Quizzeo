// Extern import
// ...

// Intern import
// ...

const keywordTextMap = {
    "keyword1" : "text",
};

export function getTextWithKeyWord(keyword) {
    const upperCaseKeyword = keyword.toUpperCase();
    return keywordTextMap[upperCaseKeyword] || upperCaseKeyword;
}