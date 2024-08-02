const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const array = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => {
        return sum + item
    }
    return array.length === 0
        ? 0
        : array.reduce(reducer, 0)
}   

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const reducer = (max, blog) => {
        return (blog.likes > max.likes) ? blog : max
    }
    const favorite = blogs.reduce(reducer, blogs[0])

    return {
        title: favorite.title, 
        author: favorite.author, 
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const reducer = (acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }
    const blogsByAuthor = blogs.reduce(reducer, {})
    
    let maxAuthor = null
    let maxBlogs = 0

    for (const author in blogsByAuthor) {
        if (blogsByAuthor[author] > maxBlogs) {
            maxBlogs = blogsByAuthor[author]
            maxAuthor = author
        }
    }

    return { author: maxAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const reducer = (acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }

    const likesByAuthor = blogs.reduce(reducer, {})

    maxAuthor = null
    maxLikes = 0

    for (const author in likesByAuthor) {
        if (likesByAuthor[author] > maxLikes) {
            maxAuthor = author
            maxLikes = likesByAuthor[author]
        }
    }

    return { author: maxAuthor, likes: maxLikes}
}   

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}