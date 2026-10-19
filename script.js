(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  let isLoading = false;

  const setLoading = (loading) => {
    isLoading = loading;
    answer.textContent = loading ? 'Loading...' : '';
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchPosts = () => {
    setLoading(true);

    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(async (array) => {
        console.log(array)
        await wait(1000);
        return array;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  example.addEventListener("click", function () {
    fetchPosts().then(array => {
      answer.textContent = JSON.stringify(array, null, 2);
    })
  })

  cw1.addEventListener("click", function () {
    fetchPosts().then(array => {
      answer.innerHTML = '';
      array.forEach(post => {
        let newDiv = document.createElement("div");
        let new_p = document.createElement("p");
        let new_id_p = document.createElement("p");
        let new_h2 = document.createElement("h2");
        let post_and_user_id = `Post ID: ${post.id}, User ID: ${post.userId}`;
        newDiv.classList.add("post");
        newDiv.style.border = "1px solid #ccc";
        new_h2.textContent = post.title;
        new_p.textContent = post.body;
        new_id_p.textContent = post_and_user_id;

        newDiv.appendChild(new_id_p);
        newDiv.appendChild(new_h2);
        newDiv.appendChild(new_p);
        answer.appendChild(newDiv);
      });
    });
  })

  cw2.addEventListener("click", function () {
    //TODO
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();
