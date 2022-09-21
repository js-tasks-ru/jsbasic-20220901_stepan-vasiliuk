function makeFriendsList(friends) {
  let html = '';

  for (let { firstName, lastName } of friends) {
    html += `<li>${firstName} ${lastName}</li>`;
  }

  let htmlElement = document.createElement('ul');
  htmlElement.innerHTML = html;
  return htmlElement;
}
